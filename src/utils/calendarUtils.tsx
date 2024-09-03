export const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case "luz":
      return "bg-warning";
    case "agua":
      return "bg-primary";
    case "gas":
      return "bg-danger";
    case "internet":
      return "bg-success";
    case "celular":
      return "bg-info";
    case "seguro":
      return "bg-secondary";
    default:
      return "bg-dark";
  }
};
