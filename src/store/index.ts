import Vue from 'vue'
import Vuex from 'vuex'
import { Mutation, State, Action } from 'vuex-simple'

Vue.use(Vuex)

const defaultMonths = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const createPerson = () => {
  return { id: -1, name: '', profileSrc: '', allowed: true }
}
const defaultMonthsState = () => defaultMonths.map(month => { return { name: month, person: createPerson() } })
const loadCandidatesFromServer = async () => {
  return fetch('/data/_guests.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status)
      }
      return response.json() as Promise<CandidateDTO[]>
    })
    .then(data => data.map(({ id, name, picture }) => {
      return { id, name, profileSrc: `data/${picture}`, allowed: true } as Candidate
    }))
}

interface CandidateDTO {
  id: number,
  name: string,
  picture: string
}

interface Month {
  name: string
  person: Candidate
}
export interface Candidate {
  id: number,
  name: string,
  profileSrc: string,
  allowed: boolean
}

export class WeddingQuiz {
  @State()
  public months: Month[] = [];

  @State()
  public candidates: Candidate[] = []

  @State()
  public currentCandidate: Candidate | undefined

  @State()
  public nextCandidate: Candidate | undefined

  @Action()
  public async loadInitialState () {
    this.candidates = await loadCandidatesFromServer()
    const storedState = window.localStorage.getItem('months')
    if (storedState) {
      this.months = JSON.parse(storedState)
      this.candidates = this.candidates.filter(candidate => !this.months.some(month => month.person.id === candidate.id))
    } else {
      this.months = defaultMonthsState()
    }
  }

  @Mutation()
  public setNextCandidate (candidate: Candidate) {
    if (!this.nextCandidate) {
      this.candidates = this.candidates.filter(existingCandidate => existingCandidate !== candidate)
      this.nextCandidate = candidate
    }
  }

  @Mutation()
  public assignNextCandidate ({ monthIndex }: {monthIndex: number}) {
    if (this.nextCandidate && this.months[monthIndex].person.id === -1) {
      this.months[monthIndex].person = this.nextCandidate
      this.nextCandidate = undefined
    }
    this.storeState()
  }

  @Mutation()
  public assignCurrentCandidate ({ monthIndex } : {monthIndex: number}) {
    if (this.currentCandidate && this.months[monthIndex].person.id === -1) {
      this.months[monthIndex].person = this.currentCandidate
      this.currentCandidate = undefined
    }
  }

  @Mutation()
  public unassignCandidateFrom ({ monthIndex } : {monthIndex: number}) {
    if (!this.currentCandidate && this.months[monthIndex].person.id !== -1) {
      this.currentCandidate = this.months[monthIndex].person
      this.months[monthIndex].person = createPerson()
    }
  }

  public async selectNextCandidate () {
    var lottery = this.candidates.filter(candidate => candidate.allowed)
    if (lottery.length === 0) {
      lottery = this.candidates
    }
    const nextCandidate = lottery[Math.floor(Math.random() * lottery.length)]
    this.setNextCandidate(nextCandidate)
  }

  public async assignCandidateTo ({ monthIndex }: { monthIndex: number }) {
    if (this.currentCandidate) {
      this.assignCurrentCandidate({ monthIndex })
    } else if (this.nextCandidate) {
      this.assignNextCandidate({ monthIndex })
    }
  }

  public async reAssignCandidateFrom ({ monthIndex }: { monthIndex: number }) {
    this.unassignCandidateFrom({ monthIndex })
  }

  public async clearNextCandidate () {
    if (this.nextCandidate) {
      this.candidates = this.candidates.filter(candidate => candidate.id !== this.nextCandidate!.id)
      this.nextCandidate = undefined
    }
  }

  public storeState () {
    window.localStorage.setItem('months', JSON.stringify(this.months))
  }
}
