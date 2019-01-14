import TeamList from '../screens/team/teamList';
import AthleteEntry from '../screens/team/athleteEntry';
import LapCount from '../screens/workout/lapCount';
import Distance from '../screens/workout/distance';
import SelectAthletes from '../screens/workout/selectAthletes';
import Timer from '../screens/workout/timer';
import ResultsList from '../screens/results/resultsList';
import WorkoutDetail from '../screens/results/workoutDetail';


export default Routes = {
  TeamRoutes: {
    TeamList: { screen: TeamList },
    AthleteEntry: { screen: AthleteEntry }
  },
  WorkoutRoutes: {
    LapCount: { screen: LapCount },
    Distance: { screen: Distance },
    SelectAthletes: { screen: SelectAthletes },
    Timer: { screen: Timer }
  },
  ResultsRoutes: {
    ResultsList: { screen: ResultsList },
    WorkoutDetail: { screen: WorkoutDetail }
  }
}
