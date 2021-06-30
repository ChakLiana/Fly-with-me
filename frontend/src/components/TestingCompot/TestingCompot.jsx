// компонент для тестирования

import { useSelector } from "react-redux";

const Testing  = () => {
console.log('-=Testing compot render=-');

let x = useSelector(state => state.user)
console.log(x)

  return ( <div className="testing">
    <h1>Testing component</h1>
    <img src="./pic2.svg" alt="SVG Here " />
  </div> );
}
 

export default Testing ;