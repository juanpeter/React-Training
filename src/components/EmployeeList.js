import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import EmployeeTable from './EmployeeTable';

const EmployeeList = () => {  
  const navigate = useNavigate();

  // Check if data is loaded
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)

  // Function in react to get data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Needs to AWAIT for the data to come
        const response = await EmployeeService.getEmployees()
        setEmployees(response.data)
      } catch(error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const deleteEmployee = (e, id) => {
    e.preventDefault()
    // Delete employee
    EmployeeService.deleteEmployees(id)
    .then((res) => {
      // Refil list with all the non deleted employees
      if(employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id)
        })
      }
    })
  }

  return (
    <div className='container mx-auto my-8'>
      <div className='h-12'>
        <button 
          className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'
          onClick={() => navigate("/addEmployee")}  
        >
          Add Employee
        </button>
      </div>
      <div className='flex shadow border-b'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                First Name
              </th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Last Name
              </th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Email ID
              </th>
              <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Actions
              </th>
            </tr>
          </thead>
          {/* If the application is not Loading data, display the list */}
          { !loading && (
          <tbody className='bg-white'>
              { employees.map((employee) => (
                <EmployeeTable 
                  key={employee.id} 
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                   />
              )) }
            </tbody> 
            )}
        </table>
      </div>
    </div>
  )
}

export default EmployeeList