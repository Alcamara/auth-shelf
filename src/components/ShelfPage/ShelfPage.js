import React from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'

function ShelfPage() {

  const dispatch = useDispatch()
  // const shelf = useSelector(store => s )

  useEffect(()=>{
    dispatch({
      type: 'FETCH_SHELF'
    })
  }, [])

  const shelfItems = useSelector(store => store.shelfItems);
  console.log('>>>>>>>>>>>>>>>>>>', shelfItems);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>Shelf Items are: 
          {shelfItems && shelfItems.map(item => (
            <li key={item.id}>{item.description}, {item.image_url}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShelfPage;
