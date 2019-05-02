import React, { Component } from 'react';
import './Statistics.css';
import { connect } from 'react-redux';
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Statistics extends Component {
  render() {


//begin pieMonth
    const pieMonth = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
              text: "Your Emotions This Month"
      },
      data: [{
              type: "pie",
              startAngle: 75,
              toolTipContent: "<b>label</b>: {y}%",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel:"{label} - {y}%",
              dataPoints: [
                        { y: 50, label: "Happy"},
                        { y: 7, label: "Sad"},
                        { y: 13, label: "Angry"},
                        { y: 5, label: "Anxious"},
                        { y: 15, label: "Confident"},
                        { y: 10, label: "Nostalgic"}
                      ] //end dataPoints

                }
              ]

      }//end pieMonth

      //end happyDays
      const happyDays = {
        animationEnabled: true,
        exportEnabled: true,
        theme:"light2",
        title:{
          text: "Happy Days by Month"
        },

        axisY:{
              title: "Days Happy",
              includeZero: false,
        },

        axisX:{
              title: "Month",
              interval: 1
        },

        //begin data
        data: [{
                type: "line",
                toolTipContent: "{x}: {y} days",
                dataPoints: [
                  {x: "May 2018", y: 16},
                  {x: "June 2018", y: 17},
                  {x: "July 2018", y: 18},
                  {x: "August 2018", y: 18},
                  {x: "September 2018", y:20},
                  {x: "October 2018", y: 22},
                  {x: "November 2018", y: 13},
                  {x: "December 2018", y: 10},
                  {x: "January 2019", y: 14},
                  {x: "February 2019", y: 1},
                  {x: "March 2019", y: 14},
                  {x: "April 2019", y: 16},

                ]
                //end dummy data
        }]

        //end data
      }//end happyDays
//NOTE: Want it to be positive emotions (happy, confident, nostalgic)?

//RETURN'S APPARENTLY SUPPOSED TO BE INSIDE RENDER -_-

return (
   <div className="Statistics">
     Statistics


<div className="dayCounter">
       Days Signed Up:
</div>

<div className="entryCounter">
  Entries:
</div>

       <div className="emoteCounter">
       Days Feeling Happy:
       Days Feeling Sad:
       Days Feeling Angry:
       Days Feeling Anxious:
       Days Feeling Confident:
       Days Feeling Nostalgic:
       </div>

       <div className="tasksCompleted">
       Tasks Completed:
       </div>


  </div>
//   </div>
 );
}
}//end render()
export default Statistics;
