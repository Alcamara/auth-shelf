import './ShelfPage.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ShelfForm(){
    const [formData,setFormData] = useState({description:'', image_url:''})
    const dispatch = useDispatch()

    return(
        <div className='form'>
            <h2>Add Item To Table</h2>
            <label>
                Description:
            </label>
            <input 
                type="text"
                onChange={(evt)=>{
                    setFormData({
                        ...formData,
                        description: evt.target.value
                    })
                }} />
            <label>
                URL:
            </label>
            <input 
                type="text"
                onChange={(evt)=>{
                    setFormData({
                        ...formData,
                        image_url: evt.target.value
                    })
                }} />
            <button onClick={()=>{
                console.log(formData)
                dispatch({
                    type:'ADD_SHELF_ITEM',
                    payload:formData
                })
            }}>
                ADD ITEM
            </button>
        </div>
    )
}