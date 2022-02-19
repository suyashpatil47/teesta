import Task from '../task';
import React, { useState } from 'react';
import './data.css';
function Data() {
    const [checkedStatus, setChecked] = useState(false);
    const setCheckbox = (event) => {

        if (!checkedStatus) {
            setChecked(true)
        } else { setChecked(false) }
    }

    const [checked, setCheckedState] = useState([]);
    const [dropvalue, setDropDown] = useState([]);
    const [checkAll, setcheckall] = useState([]);

    const dropDown = (event) => {

        var dropList = [...dropvalue];

        if (!dropvalue.includes(event.target.value)) {
            dropList = [...dropvalue, event.target.value];
        } else {
            dropList.splice(dropvalue.indexOf(event.target.value), 1);
        }
        setDropDown(dropList);
    }

    const viewCity = (event) => {
        var updatedList = [...checked];
        var updkey = [...checkAll];

        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            updkey[event.target.id] = true;
            setCheckedState(updatedList);
            Task.map((item) => {
                item.state.map((i) => {
                    if (i.id == parseInt(event.target.id) + 1) {
                        i.city.map((b) => {
                            if (!checked.includes(b.name)) {

                                updatedList = [...updatedList, b.name];
                            }
                        })
                    }
                })
            })

        } else {

            updatedList.splice(checked.indexOf(event.target.value), 1);
            updkey[event.target.id] = undefined;
            Task.map((item) => {
                item.state.map((i) => {
                    if (i.id == parseInt(event.target.id) + 1) {
                        i.city.map((b) => {

                            updatedList.splice(checked.indexOf(event.target.value), 1);

                        })
                    }
                })
            })

        }

        setCheckedState(updatedList);

        setcheckall(updkey);

    }
    const showData = () => {
        checked.map((item) => {
            console.log(item)

        }
        )
    }
    return (
        <div>   
            
            {Task.map((countr, km) => {

                return (
                    <div>
                        <div key={km} className="goal-item" onClick={setCheckbox}>


                            <span >{countr.country}</span>

                        </div>
                        <div>



                            {countr.state.map((stat, key) => {
                                return (

                                    <div>
                                        {checkedStatus && <div className="goal-item">
                                            <label>State:-</label>

                                            <input type="checkbox" key={key + 5} onChange={viewCity} value={stat.state} id={key} ></input>
                                            <button value={stat.state} onClick={dropDown}>{stat.state}</button>

                                        </div>}
                                        <div>
                                            {stat.city.map((cit, k) => {

                                                return (

                                                    <div>

                                                        {(checked.includes(stat.state) || dropvalue.includes(stat.state)) && checkedStatus && <div className="goal-item">
                                                            <input type="checkbox" key={k + 2} value={cit.name} onChange={viewCity} id={stat.state} checked={checkAll[key]}></input>
                                                            <label >{cit.name}</label>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>


                                )
                            })}

                        </div>
                    </div>
                )

            }
            )}
            {checkedStatus && <button className="goal-item" onClick={showData}>Submit</button>}
        </div>
    );


}
export default Data;