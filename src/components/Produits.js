import {
  faCheckCircle,
  faCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { checkProduct, deleteProduct, getProducts } from "../App/app";
import Produit from "./Produit";


export default function Produits() {
  const [products, setProducts] = useState([]);
  const [SearchProduct, SetSearchProduct] = useState("");
  console.log(SearchProduct)
  //Get
  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = () => {
    getProducts()
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Delete
  const handleDeleteProduct = (product) => {
    deleteProduct(product).then((resp) => {
      const newProducts = products.filter((p) => p.id != product.id);
      setProducts(newProducts);
    });
  };
  //Check Product
  const handleCheckProduct = (product) => {
    checkProduct(product).then((resp) => {
      const newProducts = products.map((p) => {
        if (p.id == product.id) {
          p.checked = !p.checked;
        }
        return p;
      });
      setProducts(newProducts);
    });
  };
  //Rechercher 

  return (
    <div className="p-1 m-1">
      <div className="row">
        <div className="col-md-">
          <div className="card">
          <div className="card-body">
            <form>
              <div className="row">
              <div className="col-auto">
              <div className='row'>
           <div className="col-auto">
                  <input type='text' placeholder='Rechercher...' name='Rechercher' className="form-control" onChange={(e)=>SetSearchProduct(e.target.value)} ></input>
            </div>
    </div>
               </div>
              <div className="col-auto">
              <Produit />
              </div>
              </div>
            </form>
            </div>
            <div className="card-body">
              <table className="table">
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
                  {products.filter((product)=>{
                    return SearchProduct.toLowerCase() === '' ? product : product.Nom.toLowerCase().includes(SearchProduct)
                  }).map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.Nom}</td>
                      <td>{product.Prix}</td>
                      <td>{product.Quantité}</td>
                      <td>
                        <button
                          onClick={() => handleCheckProduct(product)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon
                            icon={product.checked ? faCheckCircle : faCircle}
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="btn btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}