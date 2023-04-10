function Register()
{
    return (
        <form>
            <h1>Create Account</h1>
            <label> First Name: <input type="text" /></label>
            <label>Last Name: <input type="text" /></label>
            <label> E-mail:<input type="text" /></label>
            <label> Roll number:<input type="text" /></label>
            <label> Date of Birth:<input type="date" /></label>
            <label> Password<input type="text" /></label>
            <button>Sign up</button>
        </form>
    )
}
export default Register;