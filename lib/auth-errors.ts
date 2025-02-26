type FirebaseAuthError = {
  code?: string;
  message?: string;
};

export const getAuthErrorMessage = (error: FirebaseAuthError) => {
  if (error.code) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists. Please try logging in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up instead.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials and try again.";
      case "auth/invalid-login-credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      default:
        const cleanMessage = error.message
          ?.replace(/^Firebase: /, "")
          ?.replace(/ \(auth\/.*\)\.?$/, "");
        return cleanMessage || "An error occurred during authentication.";
    }
  }
  return error.message || "An error occurred during authentication.";
}; 