import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { Appcontext } from '../../context/AppContext';
import {toast} from "react-toastify"
import axios from 'axios';
const DoctorProfile = () => {
  const { dToken, docData, getProfileData, backendUrl, setDocData } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(Appcontext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: docData.address,
        fees: docData.fees,
        available: docData.available,
      };
      const { data } = await axios.post(backendUrl + "/api/doctor/update-profile", updateData, { headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();

    }
  }, [dToken]);
  return (
    docData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={docData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ------- Doc Info: name, degree, experience ------- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {docData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {docData.degree} - {docData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docData.experience}
              </button>
            </div>

            {/* ------- Doc About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setDocData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={docData.fees}
                  />
                ) : (
                  docData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setDocData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={docData.address.line1}
                  />
                ) : (
                  docData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setDocData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={docData.address.line2}
                  />
                ) : (
                  docData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setDocData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={docData.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="cursor-pointer px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full cursor-pointer mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile