import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { FixedIncomeStoreProvider } from './fixed-income-store';

/*
  Generated class for the FixedIncomeGettersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixedIncomeGettersProvider {

  constructor(private fixedIncomeStore: FixedIncomeStoreProvider) {
  }

  /**
   * Get all running Naira fixed income investments for the user
   *
   * @memberof FixedIncomeGettersProvider
   */
  getRunningNairaInvestments () {
    const fixedIncomeUserData = this.fixedIncomeStore.userFiDataSubject.getValue()

     // Get the FI and Tbill investments
    let nairaInvestments = fixedIncomeUserData.NGN
    let treasuryBills = fixedIncomeUserData.TBills

    if ((nairaInvestments === undefined) || (treasuryBills === undefined)) {
      return []
    }

    let investments = []

    let runningNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    let runningTbillInvestments = treasuryBills.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    // Loop through running fixed income investments and perform the necessary calculations
    runningNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investment.durationTillDate = durationTillDate

      investments.push(investment)
    })

    // loop through the running Tbills and perform the necessary calculations
    runningTbillInvestments.forEach((investment) => {
      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      let faceValue = parseFloat(investment.faceValue)
      let rate = (parseFloat(investment.currentRate)) / 100
      let accruedInterest = (faceValue * rate * durationTillDate) / 365
      let currentValue = accruedInterest + faceValue
      let valueAtMaturity = parseFloat(investment.faceValueAmount)

      investment.durationTillDate = durationTillDate
      investment.accruedInterest = accruedInterest
      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity

      investments.push(investment)
    })

    return investments
  }

  /**
   * Get all terminated Naira fixed income investments for the user
   *
   * @memberof FixedIncomeGettersProvider
   */
  getTerminatedNairaInvestments() {
    const fixedIncomeUserData = this.fixedIncomeStore.userFiDataSubject.getValue()

    // Get the FI and Tbill investments
    let nairaInvestments = fixedIncomeUserData.NGN
    let treasuryBills = fixedIncomeUserData.TBills

    if ((nairaInvestments === undefined) || (treasuryBills === undefined)) {
      return []
    }

    let investments = []

    let terminatedNairaInvestments = nairaInvestments.filter((investment) => {
      return investment.status === 'TERMINATED'
    })

    let terminatedTbillInvestments = treasuryBills.filter((investment) => {
      return investment.status === 'TERMINATED'
    })

    terminatedNairaInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    terminatedTbillInvestments.forEach((investment) => {
      let startDate = moment(investment.startDate, "YYYY-MM-DD")
      let durationTillDate = moment().diff(startDate, 'days')

      let faceValue = parseFloat(investment.faceValue)
      let rate = (parseFloat(investment.currentRate)) / 100
      let accruedInterest = (faceValue * rate * durationTillDate) / 365
      let currentValue = accruedInterest + faceValue
      let valueAtMaturity = parseFloat(investment.faceValueAmount)

      investment.durationTillDate = durationTillDate
      investment.accruedInterest = accruedInterest
      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity

      investments.push(investment)
    })

    return investments

  }

  /**
   * Get all running Dollar fixed income investments for the user
   *
   * @memberof FixedIncomeGettersProvider
   */
  getRunningDollarInvestments() {
    const fixedIncomeUserData = this.fixedIncomeStore.userFiDataSubject.getValue()
    let dollarInvestments = fixedIncomeUserData.USD
    let investments = []

    if ((dollarInvestments === undefined)) {
      return []
    }

    let runningDollarInvestments = dollarInvestments.filter((investment) => {
      return investment.status === 'RUNNING'
    })

    runningDollarInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    return investments;
  }

  /**
  * Get all terminated Dollar fixed income investments for the user
  *
  * @memberof FixedIncomeGettersProvider
  */
  getTerminatedDollarInvestments() {
    const fixedIncomeUserData = this.fixedIncomeStore.userFiDataSubject.getValue()
    let dollarInvestments = fixedIncomeUserData.USD
    let investments = []

    if ((dollarInvestments === undefined)) {
      return []
    }

    let terminatedDollarInvestments = dollarInvestments.filter((investment) => {
      return investment.status === 'TERMINATED'
    })

    terminatedDollarInvestments.forEach((investment) => {
      let currentValue = parseFloat(investment.accruedNetInterest) + parseFloat(investment.faceValue)
      let valueAtMaturity = parseFloat(investment.faceValue) + parseFloat(investment.expectedInterest)

      investment.currentValue = currentValue
      investment.valueAtMaturity = valueAtMaturity
      investments.push(investment)
    })

    return investments;
  }

  /**
   * Get the total value of the user's Naira fixed income portfolio
   *
   * @returns {number}
   * @memberof FixedIncomeGettersProvider
   */
  getTotalNairaFivalue() :number {
    let runningNairaInvestments = this.getRunningNairaInvestments()

    let totalFiValue = 0

    runningNairaInvestments.forEach((nairaInvestment) => {
      totalFiValue += parseFloat(nairaInvestment.currentValue)
    })

    return totalFiValue
  }

  /**
   * Get the total value of the user's Dollar fixed income portfolio
   *
   * @returns {number}
   * @memberof FixedIncomeGettersProvider
   */
  getTotalDollarFiValue() :number {
    let runningDollarInvestments = this.getRunningDollarInvestments()

    let totalDollarValue = 0

    runningDollarInvestments.forEach((dollarInvestment) => {
      totalDollarValue += parseFloat(dollarInvestment.currentValue)
    })

    return totalDollarValue
  }

}
