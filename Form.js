import React, { Component } from 'react'

import axios from 'axios';



class Form extends Component {

    constructor(props) {

      super(props)

    this.handleOptionChange=this.handleOptionChange.bind(this)

    this.handlesubmit=this.handlesubmit.bind(this)

    this.handleChange=this.handleChange.bind(this)

    

      this.state = {

         name :"",

         email :"",

         password :"",

         mobileno :"",

         selectedOption :"",

         formErrors :{

           name :"",

           email :"",

           password :"",

           mobileno :""

         }



      }

    }

    handlesubmit(e){

      e.preventDefault();

      const form={

        name : this.state.name,

        email:this.state.email,

        password:this.state.password,

        mobileno:this.state.mobileno,

        selectedOption:this.state.selectedOption

      }

      axios.post('http://localhost:4000/mongoform/add', form)

        .then(res => console.log(res.data));

      this.setState({

        name :"",

         email :"",

         password :"",

         mobileno :"",

         selectedOption :""

      })



    }

     formValid=formErrors=>{

      let valid=true;

      Object.values(formErrors).forEach(val=>{

        if(val.length>0){valid= false}

      })

      return valid

    }

   

    handleOptionChange(e){

        this.setState({

            selectedOption : e.target.value

        })

    }

    handleChange(e){

      e.preventDefault()

      const formErrors=this.state.formErrors

      const {name,value} = e.target

      switch(name){

       case 'name' : 

       formErrors.name=(value.length<3)&&(value.length>0)?'Minimum 3 characters required':"";

       break;

       case 'password' : 

       formErrors.password=(value.length<8)&&(value.length>0)?'Minimum 8 characters required':"";

       break;

       case 'mobileno' : 

       formErrors.mobileno=(value.length!=10)&&(value.length>0)?'Invalid Mobile Number':"";

       break;

       default :

       break;

      }

      this.setState({ formErrors, [name]: value })



    }

  render() {

    const { formErrors }=this.state;

    return (

      <div className="full">

      <div className="head">

        <h1>Registration Form</h1>

        </div>

        <form onSubmit={this.handlesubmit}>

        <div>

        <label>Name : </label>

        <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} ></input>

        {formErrors.name.length>0&&(

          <span className="errorMessage">

            {formErrors.name}

          </span>

        )}

        </div>

        <div>

        <br></br>

        <label>Email : </label>

        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={(e)=>this.setState({email :e.target.value})}></input>

        </div>

        <div>

        <br></br>

        <label>Password: </label>

        <input type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleChange}></input>

        {formErrors.password.length>0&&(

          <span className="errorMessage">

            {formErrors.password}

          </span>

        )}

        </div>

        <div>

        <br></br>

        <label>Mobile Number : </label>

        <input type="text" placeholder="Mobile Number" name="mobileno" value={this.state.mobileno} onChange={this.handleChange}></input>

        {formErrors.mobileno.length>0&&(

          <span className="errorMessage">

            {formErrors.mobileno}

          </span>

        )}

        </div>

        <div>

        <br></br>

        <label>Gender : </label>

        <label>

        <input type="radio" value="male" checked={this.state.selectedOption==='male'} onChange={this.handleOptionChange}></input>

        Male</label>

        <label>

        <br></br>

        <input type="radio" value="female" checked={this.state.selectedOption==='female'} onChange={this.handleOptionChange}></input>

        Female</label> 

        </div>

        <div className="submit">

        <br></br>

        <button>Submit</button>

        </div>   

        </form>

      </div>

    )

  }

}

export default Form