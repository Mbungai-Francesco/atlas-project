interface StudListProps {
  name: string,
  email: string,
  grade: string,
  attendance: number,
  performance: number

}

function StudListItem( stud: StudListProps) {
  return (
    <>
      <td className="p-4">
        <p className="font-medium">{stud.name}</p>
        <p className="text-gray-400">{stud.email}</p>
      </td>
      <td className="p-4">{stud.grade}</td>
      <td className="p-4">
        <p className="border w-fit py-0 px-3 rounded-full text-[0.86em]  font-semibold">{stud.attendance}%</p>
      </td>
      <td className="p-4">
        <div className="w-8 h-full bg-black"></div>
        <p>{stud.performance}%</p>
      </td>
    </>
  )
}

export default StudListItem;