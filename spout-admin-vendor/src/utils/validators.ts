export const validateTeamName = (name: string) => {
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
