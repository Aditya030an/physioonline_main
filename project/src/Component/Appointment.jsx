import React, { useState } from "react";

const PhysioAppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    visitType: "",
    mobile: "",
    email: "",
    appointmentDate: "",
    mode: "",
    timeSlot: "",
    complaint: "",
    duration: "",
    diagnosis: "",
    difficulties: [],
    painLevel: 0,
    address: "",
    city: "",
    landmark: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDifficultyChange = (item) => {
    setFormData((prev) => ({
      ...prev,
      difficulties: prev.difficulties.includes(item)
        ? prev.difficulties.filter((d) => d !== item)
        : [...prev.difficulties, item],
    }));
  };

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.patientName.trim()) {
        newErrors.patientName = "Patient name is required";
      }

      if (!formData.mobile) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = "Enter valid 10 digit mobile number";
      }

      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Enter valid email";
      }
    }

    if (step === 2) {
      if (!formData.appointmentDate) {
        newErrors.appointmentDate = "Date is required";
      }

      if (formData.appointmentDate && formData.appointmentDate < today) {
        newErrors.appointmentDate = "Past date is not allowed";
      }

      if (!formData.mode) {
        newErrors.mode = "Mode is required";
      }

      if (!formData.timeSlot) {
        newErrors.timeSlot = "Time slot is required";
      } else if (isPastTimeSlot(formData.timeSlot)) {
        newErrors.timeSlot = "Past time slot is not allowed";
      }
    }

    if (step === 3) {
      if (!formData.complaint.trim()) {
        newErrors.complaint = "Complaint is required";
      }
    }

    if (step === 5) {
      if (formData.mode === "Home Visit") {
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.landmark.trim())
          newErrors.landmark = "Landmark is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  const back = () => setStep(step - 1);

  const handleModeChange = (value) => {
    setMode(value);

    setFormData((prev) => ({
      ...prev,
      mode: value,
      timeSlot: "",
    }));

    if (value === "Clinic Visit") {
      setTimeSlots([
        // Morning - Movement Rehab Center
        { time: "10:00 AM", clinic: "Movement Rehab Center" },
        { time: "10:30 AM", clinic: "Movement Rehab Center" },
        { time: "11:00 AM", clinic: "Movement Rehab Center" },
        { time: "11:30 AM", clinic: "Movement Rehab Center" },
        { time: "12:00 PM", clinic: "Movement Rehab Center" },
        { time: "12:30 PM", clinic: "Movement Rehab Center" },
        { time: "01:00 PM", clinic: "Movement Rehab Center" },

        // Evening - MAYA'S BODY CARE
        { time: "06:00 PM", clinic: "MAYA'S BODY CARE" },
        { time: "06:30 PM", clinic: "MAYA'S BODY CARE" },
        { time: "07:00 PM", clinic: "MAYA'S BODY CARE" },
        { time: "07:30 PM", clinic: "MAYA'S BODY CARE" },
        { time: "08:00 PM", clinic: "MAYA'S BODY CARE" },
      ]);
    } else if (value === "Home Visit") {
      setTimeSlots([
        { time: "02:00 PM" },
        { time: "03:30 PM" },
        { time: "05:00 PM" },
      ]);
    } else if (value === "Online Consultation") {
      const slots = [];

      for (let i = 9; i <= 22; i++) {
        const hour = i > 12 ? i - 12 : i;
        const ampm = i >= 12 ? "PM" : "AM";
        slots.push(`${hour}:00 ${ampm}`);
      }

      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  };

  const getSlotTime = (slot) => {
    return typeof slot === "string" ? slot : slot.time;
  };

  const convertSlotToMinutes = (time) => {
    const [rawTime, modifier] = time.split(" ");
    let [hours, minutes] = rawTime.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const isPastTimeSlot = (slot) => {
    if (!formData.appointmentDate) return false;

    const selectedDate = formData.appointmentDate;
    const todayDate = new Date().toISOString().split("T")[0];

    if (selectedDate !== todayDate) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const slotTime = getSlotTime(slot);
    const slotMinutes = convertSlotToMinutes(slotTime);

    return slotMinutes <= currentMinutes;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookAppointment/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Appointment booking failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white p-10 rounded-2xl shadow text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-3">Appointment Submitted</h2>

          <p className="text-gray-500">
            Our team will contact you to confirm appointment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-4 pt-24 pb-10 sm:px-6 lg:pt-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Movement Rehab Physiotherapy Consultation
          </h1>

          <p className="text-gray-500 mt-2">
            Complete the form to book your physiotherapy appointment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 overflow-hidden">
          {/* SIDEBAR */}

          <div className="bg-[#0f172a] text-white p-5 sm:p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-semibold mb-8">Appointment Steps</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 md:block md:space-y-6">
              {[
                "Patient Details",
                "Appointment",
                "Medical Info",
                "Functional Info",
                "Upload & Submit",
              ].map((label, index) => {
                const number = index + 1;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 md:gap-4 ${
                      step === number ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    <div className="w-7 h-7 shrink-0 bg-white text-black rounded-full flex items-center justify-center text-sm">
                      {number}
                    </div>

                    <span className="text-xs sm:text-sm md:text-base">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FORM */}

          <div className="md:col-span-2 p-5 sm:p-6 md:p-10 lg:p-12">
            {/* STEP 1 */}

            {step === 1 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Basic Patient Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Patient Name"
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                  {errors.patientName && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.patientName}</p>
                  )}

                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                    placeholder="Age"
                    min={0}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <select
                    name="visitType"
                    value={formData.visitType}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">First Visit / Follow-up</option>
                    <option value="First Visit">First Visit</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>

                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="Mobile Number"
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                  {errors.mobile && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.mobile}</p>
                  )}

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email ID"
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                  {/* {errors.email && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.email}</p>
                  )} */}
                </div>
              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Appointment Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    type="date"
                    min={today}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                  {errors.appointmentDate && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">
                      {errors.appointmentDate}
                    </p>
                  )}

                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={(e) => handleModeChange(e.target.value)}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">Select Mode</option>
                    <option value="Clinic Visit">Clinic Visit</option>
                    <option value="Home Visit">Home Visit</option>
                    <option value="Online Consultation">
                      Online Consultation
                    </option>
                  </select>

                  {/* <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    disabled={!formData.mode}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">Select Time Slot</option>

                    {mode === "Clinic Visit" ? (
                      <>
                        <optgroup label="Morning - MOVEMENT REHAB CENTER">
                          {timeSlots
                            .filter(
                              (slot) => slot.clinic === "Movement Rehab Center",
                            )
                            .map((slot, i) => (
                              <option key={i}>{slot.time}</option>
                            ))}
                        </optgroup>

                        <optgroup label="Evening - MAYA'S BODY CARE">
                          {timeSlots
                            .filter(
                              (slot) => slot.clinic === "MAYA'S BODY CARE",
                            )
                            .map((slot, i) => (
                              <option key={i}>{slot.time}</option>
                            ))}
                        </optgroup>
                      </>
                    ) : (
                      timeSlots.map((slot, i) => (
                        <option key={i}>{slot.time}</option>
                      ))
                    )}
                  </select> */}

                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    disabled={!formData.mode || !formData.appointmentDate}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">Select Time Slot</option>

                    {mode === "Clinic Visit" ? (
                      <>
                        <optgroup label="Morning - MOVEMENT REHAB CENTER">
                          {timeSlots
                            .filter(
                              (slot) => slot.clinic === "Movement Rehab Center",
                            )
                            .map((slot, i) => (
                              <option
                                key={i}
                                value={slot.time}
                                disabled={isPastTimeSlot(slot)}
                              >
                                {slot.time}{" "}
                                {isPastTimeSlot(slot) ? "(Not available)" : ""}
                              </option>
                            ))}
                        </optgroup>

                        <optgroup label="Evening - MAYA'S BODY CARE">
                          {timeSlots
                            .filter(
                              (slot) => slot.clinic === "MAYA'S BODY CARE",
                            )
                            .map((slot, i) => (
                              <option
                                key={i}
                                value={slot.time}
                                disabled={isPastTimeSlot(slot)}
                              >
                                {slot.time}{" "}
                                {isPastTimeSlot(slot) ? "(Not available)" : ""}
                              </option>
                            ))}
                        </optgroup>
                      </>
                    ) : (
                      timeSlots.map((slot, i) => {
                        const slotTime = getSlotTime(slot);

                        return (
                          <option
                            key={i}
                            value={slotTime}
                            disabled={isPastTimeSlot(slot)}
                          >
                            {slotTime}{" "}
                            {isPastTimeSlot(slot) ? "(Not available)" : ""}
                          </option>
                        );
                      })
                    )}
                  </select>

                  {errors.timeSlot && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.timeSlot}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Medical Condition
                </h2>

                <div className="space-y-5">
                  <input
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    placeholder="Problem / Complaint"
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                  {errors.complaint && (
                    <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.complaint}</p>
                  )}

                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  >
                    <option value="">Duration of Problem</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                  </select>

                  <input
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Diagnosis"
                    className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                  />
                </div>
              </div>
            )}

            {/* STEP 4 */}

            {step === 4 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Functional Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Walking Difficulty",
                    "Sitting Difficulty",
                    "Standing Difficulty",
                    "Hand Function Difficulty",
                  ].map((item) => (
                    <label
                      key={item}
                      className="border rounded-lg p-4 flex items-center gap-3 text-sm sm:text-base"
                    >
                      <input
                        type="checkbox"
                        checked={formData.difficulties.includes(item)}
                        onChange={() => handleDifficultyChange(item)}
                      />
                      {item}
                    </label>
                  ))}

                  <input
                    name="painLevel"
                    value={formData.painLevel}
                    onChange={handleChange}
                    type="range"
                    min="0"
                    max="10"
                    className="w-full mt-2"
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    Pain Level: {formData.painLevel}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5 */}

            {step === 5 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Upload Reports
                </h2>

                {formData.mode === "Home Visit" && (
                  <div className="space-y-4 mb-6">
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                    />
                    {errors.address && (
                      <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.address}</p>
                    )}

                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                    />
                    {errors.city && (
                      <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.city}</p>
                    )}

                    <input
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Landmark"
                      className="w-full border rounded-lg p-3 outline-none focus:border-[#003A80]"
                    />

                    {errors.landmark && (
                      <p className="-mt-3 text-red-500 text-sm md:col-span-2">{errors.landmark}</p>
                    )}
                  </div>
                )}

                <input type="file" className="mb-6 w-full rounded-lg border p-3" />

                <label className="flex items-start gap-3 mb-8 text-sm sm:text-base">
                  <input
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  I agree to physiotherapy treatment policies
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#003A80] text-white px-8 py-3 rounded-lg disabled:opacity-60 hover:bg-[#002a5e]"
                >
                  {loading ? "Submitting..." : "Submit Appointment"}
                </button>
              </div>
            )}

            {/* NAVIGATION */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between mt-10">
              {step > 1 && (
                <button onClick={back} className="w-full sm:w-auto border px-6 py-3 rounded-lg">
                  Back
                </button>
              )}

              {step < 5 && (
                <button
                  onClick={next}
                  className="w-full sm:w-auto bg-[#003A80] text-white px-6 py-3 rounded-lg hover:bg-[#002a5e]"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysioAppointmentForm;
