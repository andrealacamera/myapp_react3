// import { useSelector } from "react-redux";

const Footer = () => {
  const Y = new Date().getFullYear();
  return (
    <footer className='bg-gray-800 text-gray-200 w-full p-4 flex flex-row justify-between'>
      <span>
        Copyright &copy; {Y} | Andrea La Camera
      </span>
    </footer>
  )
}

export default Footer