import * as React from 'react';
import "../App.css";
function Home() {
    return (
        <div className="home">
            <div className="table">

                <table style={{ width: "100%" }}>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td colspan="2" rowSpan={2}>Tasks</td>
                        <td>Profile</td>
                        <td>Points</td>
                    </tr>

                    <tr>
                        <td colspan="2">Badges/Achievements</td>
                    </tr>

                    <tr>
                        <td colspan={2} rowSpan={2}> Leaderboard</td>
                        <td colspan={2} rowSpan={2}>Social</td>
                    </tr>

                </table>
            </div>


        </div>
    );
}

export default Home;