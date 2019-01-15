import TeamList from '../screens/team/teamList';
import AthleteEntry from '../screens/team/athleteEntry';
import LapCount from '../screens/workout/lapCount';
import Distance from '../screens/workout/distance';
import SelectAthletes from '../screens/workout/selectAthletes';
import ResultsList from '../screens/results/resultsList';
import WorkoutDetail from '../screens/results/workoutDetail';

export default Routes = {
  WorkoutRoutes: {
    LapCount: { screen: LapCount },
    Distance: { screen: Distance },
    SelectAthletes: { screen: SelectAthletes },
  },
  ResultsRoutes: {
    ResultsList: { screen: ResultsList },
    WorkoutDetail: { screen: WorkoutDetail }
  },
  TeamRoutes: {
    TeamList: { screen: TeamList },
    AthleteEntry: { screen: AthleteEntry }
  }
}
