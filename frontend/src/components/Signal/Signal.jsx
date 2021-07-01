import { useSelector } from "react-redux";

const SignalCompot = () => {
  console.log(" -=Signal Compot render");
  const rawIvents = useSelector((state) => state.ivents);
  const user = useSelector((state) => state.user);
  console.log("ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ", user);
  console.log("ВСЕ СОБЫТИЯ", rawIvents);

  // make custom hook for making useState
  function useSSelector(value, index) {
    let x = {};
    x = useSelector((state) => state.ivents[value].passengerAccepted[index]);
    return x;
  }
  // end of custom hook

  // Accepted section
  // 1. detect index of ivents containing accepted flights
  const acceptIncluders = [];

  rawIvents.map((item, index) => {
    if (item.passengerAccepted.length > 0) {
      // acceptIncluders.push(rawIvents.indexOf(item))
      acceptIncluders.push(index);
    }
  });
  console.log("Accepted found", acceptIncluders);
  // end of 1

  //2. check if logged user is the accepted user and put it to dedicated array

  const calculatedAccepted = [];

  for (let i = 0; i < acceptIncluders.length; i++) {
    for (
      let j = 0;
      j < rawIvents[acceptIncluders[i]].passengerAccepted.length;
      j++
    ) {
      if (rawIvents[acceptIncluders[i]].passengerAccepted[j]._id === user._id) {
        console.log(
          user.nickName,
          "!!! ПРИНЯТ !!!",
          rawIvents[acceptIncluders[i]].description
        );
        calculatedAccepted.push({
          acceptedPassenger: user.nickName,
          acceptedFlight: rawIvents[acceptIncluders[i]].description,
        });
      }
    }
  }

  console.log("ACCEPTED ARRAY ==<> ", calculatedAccepted);

  // END OF Accepted section

  // Pending section

  // 1. detect index of ivents containing pending flights
  const pendingIncluders = [];

  rawIvents.map((item, index) => {
    if (item.passengerPending.length > 0) {
      pendingIncluders.push(index);
    }
  });
  console.log("Pending found", pendingIncluders);
  // end of 1

  //2. check if logged user is the pending user and put it to dedicated array

  const calculatePending = [];

  for (let i = 0; i < pendingIncluders.length; i++) {
    for (
      let j = 0;
      j < rawIvents[pendingIncluders[i]].passengerPending.length;
      j++
    ) {
      if (
        rawIvents[pendingIncluders[i]].passengerPending[j]._id === user._id
      ) {
        console.log(
          user.nickName,
          "!!! ЗАПИСАН !!!",
          rawIvents[pendingIncluders[i]].description
        );
        calculatePending.push({
          pendingPassenger: user.nickName,
          pendingFlight: rawIvents[pendingIncluders[i]].description,
        });
      }
    }
  }

  console.log("PENDING ARRAY ==<> ", calculatePending);

  // END OF Pending section

  // Rejected Section 



// 1. detect index of ivents containing pending flights
const rejectedIncluders = [];

rawIvents.map((item, index) => {
  if (item.passengerRejected.length > 0) {
    rejectedIncluders.push(index);
  }
});
console.log("Rejected found", rejectedIncluders);
// end of 1

//2. check if logged user is the rejected user and put it to dedicated array

const calculateRejected = [];

for (let i = 0; i < rejectedIncluders.length; i++) {
  for (
    let j = 0;
    j < rawIvents[rejectedIncluders[i]].passengerRejected.length;
    j++
  ) {
    if (
      rawIvents[rejectedIncluders[i]].passengerRejected[j]._id === user._id
    ) {
      console.log(
        user.nickName,
        "!!! ВАМ ОТКАЗАНО !!!",
        rawIvents[rejectedIncluders[i]].description
      );
      calculateRejected.push({
        rejectedPassenger: user.nickName,
        rejectedFlight: rawIvents[rejectedIncluders[i]].description,
      });
    }
  }
}

console.log("REJECTED ARRAY ==<> ", calculateRejected);


  // END OF Rejected Section 

  console.log("ALL FOR SIGNAL",  calculatedAccepted, calculatePending, calculateRejected)




  return (
    <div className="signal">
      <p>Signal</p>
    </div>
  );
};

export default SignalCompot;
