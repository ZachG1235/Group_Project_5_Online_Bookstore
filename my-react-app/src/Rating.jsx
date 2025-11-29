import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'

function Rating(props) {
    const rating = props.rating;
    const starsArr = [1, 2, 3, 4, 5];
    return (
        starsArr.map((star, index) => {
          index += 1;
          return (
            <div key={index} id={index} 
              className={index <= parseFloat(rating) ? ("on") : ("off")}>
              <span className="star">&#9733;</span> {/* Star unicode */}
            </div>
          );
          })
    )
}

export default Rating