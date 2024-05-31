import React from "react";

function LoginPage() {
    const handleGoogleLogin = () => {
        try {
            // Redirect the user to Google OAuth login page
            window.location.href =
                "http://localhost:8080/oauth2/authorization/google";
        } catch {
            console.log("error");
        }
    };

    const handleGithubLogin = () => {
        try {
            // Redirect the user to GitHub OAuth login page
            window.location.href =
                "http://localhost:8080/oauth2/authorization/github";
        } catch {
            console.log("git");
        }
    };

    return (
        <div
            className="container-fluid"
            style={{
                backgroundImage: `url('https://i.imgur.com/Vd18jqK.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="card p-4"
                style={{ width: "500px", height: "500px" }}
            >
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Login</h1>
                    <div
                        className="d-grid gap-2"
                        style={{ marginTop: "100px" }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={handleGoogleLogin}
                        >
                            Login with Google
                        </button>
                        <button
                            className="btn btn-dark mt-2"
                            onClick={handleGithubLogin}
                            style={{ marginTop: "250px" }}
                        >
                            Login with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
