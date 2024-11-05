import React, { useEffect, useState } from 'react';
import './TrainInfo.css';
import axios from 'axios';
import {API_BASE_URL} from '../../../config/apiConfig'
import { convertDateString } from '../../../Admin/component/ScheduleForm/convertDate';

const TrainInfo = ({ infoSchedule, onSelect }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [dataSchedules, setDataSchedules] = useState([])

  const handleTrainClick = (trainNumber, scheduleId, trainName , timeSchedule, distance, codeSchedule) => {
    setSelectedTrain(scheduleId);
    onSelect({trainNumber,scheduleId, trainName, timeSchedule, distance,codeSchedule}); 
  };

 
  useEffect(()=> {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Schedules/GetSchedulesCustomer?from=${infoSchedule.route_from}&to=${infoSchedule.route_to}&date=${infoSchedule.date_schedule}`);
        
        if(res.data != null) {
          setDataSchedules(res.data)
        }
        
      } catch  {

      }
    };

    fetchPost();
  },[])


  return (
    <div>
      {dataSchedules.map((schedule) => (
        <div
          key={schedule.id}
          className={`train ${selectedTrain === schedule.id ? 'selected' : ''}`}
          onClick={() => handleTrainClick(schedule.trainId, schedule.id ,schedule.codeSchedule.substring(0, 4), schedule.timeSchedule, schedule.distance, schedule.codeSchedule)}
        >
          <div className="train-number h-[120px]">
            <div className="name-train">{schedule.codeSchedule.substring(0, 4)}</div>
            <div className="Departure">
              <div className="left">Departure</div>
              <div className="right">{convertDateString(schedule.dateSchedule) +' '+ schedule.timeSchedule}</div>
            </div>
           
          </div>
        </div>
      ))}
    </div>
  );
};
export default TrainInfo;