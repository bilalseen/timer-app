import { formatDistance, parseISO } from "date-fns";

const formattedDate = ({ noteDate }: { noteDate: string }) => {
  const date = formatDistance(parseISO(noteDate), new Date(), {
    addSuffix: true,
  });
  return date;
};

export default formattedDate;
