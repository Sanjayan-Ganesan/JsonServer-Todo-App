import React,{useState,useEffect} from 'react'
import styles from "./todo.module.css";
import axios from "axios"
const Todos = () => {

    const[newtodo,setnewtodo] = React.useState("");
    const[todo,settodo] = React.useState([]);
    const[page,setpage] =React.useState(1);
    const[totalcount,settotalcount] = React.useState(0);



const gettodo = async ()=>{
    await axios.get(`http://localhost:8000/Todos?_page=${page}&_limit=4`).then((r)=>{
        settodo(r.data);
        settotalcount(Number(r.headers["x-total-count"]));

    });

}


useEffect(()=>{
    gettodo();
},[page])


const handelsave = ()=>{
   fetch("http://localhost:8000/Todos",{
       method:"POST",
       headers:{
           "content-type" : "application/json",
       },
       body: JSON.stringify({
           title : newtodo,
           Status: false,

       }),
   })
   .then((r)=> r.json())
   .then((d) => {
       settodo([...todo,d]);
       setnewtodo("");
   });
};




  return (
      <>

<div>
<div id={styles.navbar}>
<div>
    <input type={`text`} placeholder="Write Something..." onChange={({target})=> setnewtodo(target.value)} />
    <button onClick={handelsave}>Save</button>
    
</div>



</div>


<div id={styles.display_box}>

    {todo.map((todos)=>{
        return (
            <div key={todos.id}>

                <h2>{todos.title}</h2>
                </div>
        )
    })}

  
</div>
<div id={styles.button_inc}>
<button disabled={page<=1}

onClick={
    ()=>{
        if(page > 1){
            setpage(page - 1);
        }
    }
}>{`<`}</button>
<button

disabled={totalcount < page * 5}


onClick={()=>{
    if(page < 1){
        setpage(page + 1);
    }
}} >{`>`}</button>
</div>




<div>


</div>
</div>
      </>
    
  )
}

export default Todos