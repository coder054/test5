const TrainingData = () => {
  return (
    <div className="bg-defaultBackGround rounded-lg w-full">
      <div className="p-10">
        <p className="font-bold text-[17px] mb-7">Training updates</p>
        <div className="bg-[#13161A] text-[#A2A5AD] text-[16px] font-medium grid grid-cols-4 px-4 py-2">
          <p>Date</p>
          <p>Category</p>
          <p>Strain</p>
          <p>Hours</p>
        </div>
        <div className="text-[15px] font-normal grid grid-cols-4 p-4">
          <p>Training</p>
        </div>
      </div>
    </div>
  )
}

export default TrainingData
