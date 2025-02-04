import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import AchievementCard from "../../components/AchievementCard";
import "./UserAchievements.css";
import { AchievementXUser } from "../../types/userTypes";
import { getUserAchievements } from "../../services/achievementService";	

const UserAchievements: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [userAchievements, setUserAchievements] = useState<AchievementXUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        updateAchievements();
    }, []);

    const updateAchievements = async () => {
        try {
            const achievementsData = await getUserAchievements();
            setUserAchievements(achievementsData);
        } catch (error) {
            console.error("Error fetching achievements:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="achievements-page">
                {user && <Header user={user} />}
                <div className="achievements-container">
                    <p>Cargando logros...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="achievements-page">
            {user && <Header user={user} />}
            <div className="achievements-container">
                <div className="content">
                    <h2 className="achievements-title">Mira tus logros</h2>

                    <div className="achievements-grid">
                        {userAchievements.length > 0 ? (
                            userAchievements.map((achievement) => (
                                <AchievementCard key={achievement.id} achievementXUser={achievement} />
                            ))
                        ) : ( 
                            <p className="no-achievements">No tienes logros</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAchievements;