import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Employee = () => {

    const[emp,setEmp]=useState([])

    useEffect(()=>{

        const fetchAllEmp=async()=>{
            try{
                const res= await axios.get("http://localhost:8800/employee")
                setEmp(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllEmp()
    },[])

    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/employee/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
            
        }
    }

        return (
            <div className='final'>
                <h1>Employee Details</h1>
                <table className="emptab">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Dob</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Ph.No</th>
                            <th>Dept</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp.map(emps=>(
                            <tr>
                                <td>{emps.id}</td>
                                <td>{emps.name}</td>
                                <td>{emps.gender}</td>
                                <td>{emps.dob}</td>
                                <td>{emps.age}</td>
                                <td>{emps.email}</td>
                                <td>{emps.salary}</td>
                                <td>{emps.phno}</td>
                                <td>{emps.dept}</td>
                                <td><button className="deleteemp" onClick={()=>handleDelete(emps.id)}>Delete</button></td>
                                <td><button className="updateemp"><Link to={`/update/${emps.id}`}>Update</Link></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="addemp"><Link to="/add">Add Employee </Link></button>
            </div>
        )
}

export default Employee