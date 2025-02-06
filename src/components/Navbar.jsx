import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
    const user  = useSelector(state => state.auth)
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <label className="btn btn-ghost btn-circle" htmlFor="my-drawer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <a className="btn btn-ghost text-xl">Vidtube</a>
            </div>
            <div className="navbar-end">
                <div className="form-control mr-5">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-72" />
                </div>
                {user.status == true ? (<div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={user.userData.avatar} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-zinc-950 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        <li>
                            <a className="justify-between text-lg">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a className='text-lg'>Settings</a></li>
                        <li><a className='text-lg'>Logout</a></li>
                    </ul>
                </div>) :
                    (<button className='btn btn-primary md:w-24 w-16 text-base'>Login</button>)}
            </div>
        </div>
    )
}

export default Navbar