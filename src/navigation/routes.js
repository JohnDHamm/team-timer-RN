import TeamList from '../screens/team/team_list';
import AthleteEntry from '../screens/team/athlete_entry';
import LapCount from '../screens/workout/lap_count';
import LapDistance from '../screens/workout/lap_distance';
import LapMetric from '../screens/workout/lap_metric';
import SelectAthletes from '../screens/workout/select_athletes';
import ConfirmWorkout from '../screens/workout/confirm_workout';
import ResultsList from '../screens/results/results_list';
import WorkoutDetail from '../screens/results/workout_detail';

export default Routes = {
  WorkoutRoutes: {
    LapCount: { screen: LapCount },
    LapDistance: { screen: LapDistance },
    LapMetric: { screen: LapMetric },
    SelectAthletes: { screen: SelectAthletes },
    ConfirmWorkout: { screen: ConfirmWorkout },

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
