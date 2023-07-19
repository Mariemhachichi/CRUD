import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Produits() {
  const [products, setProducts] = useState([
    {id:1,checked:false},
    {id:2,checked:true}
  ])
  //Delete
  const handeDeleteProduct =(product)=>{
    const newProducts = products.filter((p) =>p.id != product.id)
    setProducts(newProducts)
  }
  //Check Product
  const handeCheckProduct =(product)=>{
    const newProducts = products.map(p =>{
      if(p.id == product.id){
        p.checked=!p.checked
      }
      return p
    })
    setProducts(newProducts)
  }
  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
                   <table className='table'>
                    <thead>
                      <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
                      <th>Checked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map(product=>(
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.Nom}</td>
                            <td>{product.Prix}</td>
                            <td>{product.Quantité}</td>
                            <td>{product.checked}</td>
                            <td>
                              <button onClick={()=>handeCheckProduct(product)} className='btn btn-outline-success'>
                                <FontAwesomeIcon icon={product.checked ? faCheckCircle: faCircle}></FontAwesomeIcon>
                              </button> 
                            </td>
                            <td>
                              <button onClick={()=>handeDeleteProduct(product)} className='btn btn-outline-danger'>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                              </button> 
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
