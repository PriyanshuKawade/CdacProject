import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'

export default function OwnerProfile(){
    const [data,setData]=useState()
    const id=sessionStorage.getItem("id")
    const handleActivate = e=>{
        let status=data?.active?'DeActivate':'Activate'
        Swal.fire({
            title: `Do you want to ${status} this owner?`,
            showCancelButton: true,
            confirmButtonText: status,
            }).then((result) => {
            if (result.isConfirmed) {
                updateStatus()                
            } 
            })
    }
    const updateStatus=()=>{
        axios.put('http://localhost:8080/api/owners/'+id)
        .then(resp=>{
            loadData()
            Swal.fire({
                title: resp.data
            })            
        })
    }
    const loadData=()=>{
        axios.get('http://localhost:8080/api/owners/'+id)
        .then(resp=>{
            setData(resp.data)
        })
    }
    useEffect(()=>{
        loadData()
    },[])
    return(        
        <>
            <div className="container mt-5">            
            <h3 style={{paddingBottom:'35px'}}>Seller Profile {data?.name}</h3>
            <table className="table " style={{border:'1px solid black'}}>
                <thead>
                    <tr>
                        <th>Seller name</th>
                        <th>{data?.name}</th>
                        <th rowspan={6} style={{paddingLeft:'10px',border:'1px solid black',textAlign:'center'}}>
                            Adhar Id<br/>     
                            <img style={{height:"250px"}} src={'http://localhost:8080/'+data?.uidphoto} alt='Adhar image' />
                        </th>
                        <th rowSpan={6} style={{paddingLeft:'10px',border:'1px solid black',textAlign:'center'}}>
                            Light Bill Image<br/>
                            <img style={{height:"250px"}} src={'http://localhost:8080/'+data?.lightbill} alt="Light Bill" />
                        </th>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <th>{data?.gender}</th>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>{data?.address}</th>
                    </tr>
                    <tr>
                        <th>Phone no</th>
                        <th>{data?.phone}</th>
                    </tr>
                    <tr>
                        <th>Email Id</th>
                        <th>{data?.userid}</th>
                    </tr>
                    <tr>
                        <th>Seller Status</th>
                        <th>{data?.active ? 'Active':'Inactive'}</th>
                    </tr>
                </thead>
            </table>
            </div>
        </>
    )
}
