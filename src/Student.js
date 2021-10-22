import React, {useState} from 'react';
import plus from './plus_pic.png'
import minus from './minus_pic.png'
import input from 'materialize-css';

function Student(props) {
    const {student, addTag} = props
    const [open, setOpen] = useState(false)
    const [tagInput, setTagInput] = useState('')

    /*const stringCreator = (str) => {
        let subStrings
        if(searchValue==='') subStrings=[str]
        else subStrings = str.split(regexp)
        return subStrings.map((el, i, arr)=> i!==arr.length-1? <p>{el}<span className='yellow' >{searchValue}</span></p>:
            <p>{el}</p>)
    }*/


    return (
        <div className="student">
            <div className="student__text-wrapper">
                <div className="student-img">
                    <img src={student.pic} alt="student-avatar"/>
                </div>
                <div className="student-description">
                    <div className="student-name" >{student.firstName.toUpperCase() +" "+student.lastName.toUpperCase() }</div>
                    <div>Email: {student.email}</div>
                    <div>Company: {student.company}</div>
                    <div>Skill: {student.skill}</div>
                    <div>Average: {student.grades.reduce((a,b)=>a+b,0)/student.grades.length}%</div>
                    {open && <div>{student.grades.map(el=><div key={el}>Test: {el}%</div>)}</div>}
                    {student.tag && <div>Tag: {student.tag}</div>}
                    <button className="button-tag" onClick={()=>{addTag(tagInput,student.id);setTagInput('')}}>new tag</button>
                    {/*<input placeholder="Add a tag" type="text" value={tagInput} onChange={e=>setTagInput(e.target.value)}/>*/}
                    <div className="input-field col s6">
                        <input id="Tag" type="text" className="validate" value={tagInput} onChange={e=>setTagInput(e.target.value)}/>
                        <label htmlFor="Tag">Add a tag</label>
                    </div>
                </div>
            </div>
            <button onClick={()=>setOpen(!open)}>
                <img src={open ? minus : plus} alt="+"/>
            </button>
        </div>
    );
}
export default Student;