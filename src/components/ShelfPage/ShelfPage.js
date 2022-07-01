import React from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ShelfPage.css'

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
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shelfItems && shelfItems.map(item => (
            <tr key={item.id}>
              <td>
              {item.description}
              </td>
              <td>
              {item.image_url}
              </td>
              <td>
                <button onClick={()=>{
                  dispatch({
                    type:item.id
                  })
                }}>
                  DEL
                </button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShelfPage;
