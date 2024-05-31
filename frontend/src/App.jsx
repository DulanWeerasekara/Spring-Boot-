import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import PostList from "./Pages/PostList";
import AddPostForm from "./Pages/AddPost";
import PostListTable from "./Pages/PostListTable";
import MealPlansPage from "./Pages/MealPlanner/MealPlansPage";
import LoginPage from "./Pages/MealPlanner/login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/post-list" element={<PostList />} />
                <Route path="/add-post" element={<AddPostForm />} />
                <Route path="/post-list-table" element={<PostListTable />} />
                <Route path="/mealplanpage" element={<MealPlansPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
