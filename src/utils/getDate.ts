



const getDate = (dateStr:string) => {

 
    const date = new Date(dateStr);

    const year = date.getFullYear(); // 2025
    const month = new Intl.DateTimeFormat("en", { month:"short" }).format(
      date
    );
    const day = date.getDate(); // 2

    return [ year ,  month ,  day  ];
}

export default getDate