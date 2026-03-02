export default function Pagination({
 total,
 perPage,
 currentPage,
 setCurrentPage
}) {

 const pages = Math.ceil(total / perPage);

 return (
  <div style={{
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
    gap:"8px",
    margin:"20px 0"
  }}>

     {[...Array(pages)].map((_,i)=>{

       const pageNumber = i + 1;

       return (
         <button
           key={i}
           onClick={()=>setCurrentPage(pageNumber)}
           style={{
             padding:"10px 15px",
             borderRadius:"12px",
             border:"none",
             cursor:"pointer",
             background:
               currentPage === pageNumber
                 ? "#333"
                 : "#eee",
             color:
               currentPage === pageNumber
                 ? "white"
                 : "black"
           }}
         >
           {pageNumber}
         </button>
       );

     })}

   </div>
 );
}