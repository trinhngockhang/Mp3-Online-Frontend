export const convertToName = (arr = []) => {
  let name = '';
  arr.forEach((data, index) =>{
    name += index === 0 ? data : ', ' + data;
  })
  return name;
}

export const convertToMinute = (seconds = 0) => {
    
}