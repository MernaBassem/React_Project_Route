import React from 'react';
import FeatureProduct from '../FeatureProduct/FeatureProduct';
import {Helmet} from "react-helmet";


export default function Products() {
 return(
  <>
   <Helmet>
      <title>Products</title>
    </Helmet>
  <FeatureProduct />
  </>
 )
}
