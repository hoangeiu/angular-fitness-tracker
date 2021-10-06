import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises$: Observable<Exercise[]>;
  // exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;
  // private loadingExercisesSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingExercisesSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoadingState) => (this.isLoading = isLoadingState)
    // );
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
    //   (exercises) => (this.exercises = exercises)
    // );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercise();
  }

  ngOnDestroy(): void {
    // if (this.loadingExercisesSubs) {
    //   this.loadingExercisesSubs.unsubscribe();
    // }
    // if (this.exerciseSubscription) {
    //   this.exerciseSubscription.unsubscribe();
    // }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
