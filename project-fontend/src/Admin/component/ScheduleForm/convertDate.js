export const convertDateFormat = (inputDate) => {
  const dateObject = new Date(inputDate);

  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date format");
    return null;
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const convertDateString = (input) => {
  const originalDate = new Date(input);

  
  // Sử dụng Intl.DateTimeFormat để định dạng lại chuỗi ngày
  const formattedDateString = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(originalDate);
  return formattedDateString;
};


export const  sumDigits = (numberString)=> {
  var sum = 0;
  for (var i = 0; i < numberString.length; i++) {
    sum += parseInt(numberString[i]);
  }
  return sum;
}