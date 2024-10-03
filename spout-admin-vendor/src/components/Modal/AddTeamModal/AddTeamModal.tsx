import React, { useState, useEffect, useRef } from "react";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNewTeam: (teamName: string) => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({
  isOpen,
  onClose,
  addNewTeam,
}) => {
  const [name, setName] = useState<string>("");
  const [validation, setValidation] = useState<{
    isValid: boolean;
    errorMessage: string;
  }>({ isValid: true, errorMessage: "" });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const validateName = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { isValid: false, errorMessage: "Team name is required." };
    }
    if (trimmedName.length > 100) {
      return {
        isValid: false,
        errorMessage: "Name must be 100 characters or less.",
      };
    }
    return { isValid: true, errorMessage: "" };
  };

  const handleAddTeam = async () => {
    const validationResult = validateName(name);
    setValidation(validationResult);

    if (!validationResult.isValid) return;

    addNewTeam(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    const validationResult = validateName(newName);
    setValidation(validationResult);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-2xl w-80">
        <div className="px-6 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Add New Team
          </h2>

          <label className="block mb-2" htmlFor="name">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className={`w-full p-2 border rounded-lg ${
              !validation.isValid ? "border-red-500" : ""
            }`}
          />
          {!validation.isValid && (
            <p className="text-red-500 text-sm">{validation.errorMessage}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6" />

        <div className="flex justify-end gap-2 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-lg text-gray-700 font-semibold bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTeam}
            disabled={name === ""}
            className={`px-8 py-2 rounded-lg text-white ${
              validation.isValid && name !== ""
                ? "bg-blue-500"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;
