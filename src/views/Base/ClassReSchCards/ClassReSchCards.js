import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
const axios = require('axios');

class ClassReSchCards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      dummycount:20,
      starPress:false,
      starPress1:false,
      array : [],
      final:[],
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  cardData = (res) =>{
    console.log(res.status,"inside function");
    
    if(res.status == 200){
      console.log(res.data);
      
      let array2=res.data;
      let count = Object.keys(res.data).length;
      let courseNames: [];
      console.log(array2);
      for(let i=0;i<count;i++){
          let body2={
            'cou_id':array2[i]["course_id"],
           }
           axios({method:'post',
          url:'http://10.0.52.19:8000/api/post_get_course_id/',
          //url:'http://192.168.43.137:8000/api/post_course_assign_mix/',
          data:[body2]  }).then(res =>{
            console.log("dhsfjgsdfdsyufds....",res.data[0]["course_name"]);
          });
          //array2[i]["course_id"] = res.data[0]["course_name"];
          //courseNames.push(res.data[0]["course_name"]);
          //console.log("dhsfjgsdfdsyufds....",res.data)
          //array2[i]["course_id"] = res.data[0]["course_name"];
        
      }
      this.setState({array:array2.reverse()});
      //this.setState({final:courseNames.reverse()});
    }
    else{
      console.log(res.status);
    }
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handlePress = async () => {
    let self=this;
    console.log("entered function");

    await axios.get("http://192.168.43.137:8000/api/classreschedules/").then(res => {
      self.cardData(res);
    })
    //let array2 = [{'key1':'value1','key11':'value11'},{'key1':'value2','key11':'value22'}];

    //this.setState({array:array2})
    
  }

  componentWillMount(){
    this.handlePress();
  }

  render() {
    let self = this;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          {self.state.array.map(function(x,i){
          return (<Card key={i} className="card-accent-danger">
              <CardHeader>
                <strong style={{fontSize: 20, color:'rgba(205,98,106,1)'}}>{self.state.array[i]["course_id"]}</strong><br></br><small>{self.state.array[i]["post_time"]}</small>
              </CardHeader>
              <CardBody>
                <b><u>Old Time : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["old_time"]}</span><br></br>
                <b><u>New Time : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["new_time"]}</span><br></br>
                <b><u>Old date : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["old_date"]}</span><br></br>
                <b><u>New date : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["new_date"]}</span><br></br>
                <b><u>Old room : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["old_room"]}</span><br></br>
                <b><u>New room : </u></b><span style={{fontSize: 12, color:'rgba(86,57,71,1)'}}>{self.state.array[i]["new_room"]}</span><br></br>
                {self.state.array[i]["description"]}<br></br>
                
              </CardBody>
            </Card>)
         })
       }
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default ClassReSchCards;
