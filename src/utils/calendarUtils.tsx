export const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case "luz":
      return "bg-warning";
    case "agua":
      return "bg-primary";
    case "gas":
      return "bg-info";
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
