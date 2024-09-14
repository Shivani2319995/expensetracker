import { useEffect, useState, useCallback } from "react";
import Card from "../../components/Card";
import styles from "./Home.module.css";
import TransactionList from "../../components/TransactionList";
import ExpenseForm from "../../components/ExpenseForm";
import Modal from "../../components/Modal";
import AddBalanceForm from "../../components/AddBalanceForm";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

const calculateCategoryStats = (expenseList) => {
  return expenseList.reduce(
    (acc, item) => {
      acc.spends[item.category] =
        (acc.spends[item.category] || 0) + Number(item.price);
      acc.counts[item.category] = (acc.counts[item.category] || 0) + 1;
      return acc;
    },
    {
      spends: { food: 0, entertainment: 0, travel: 0 },
      counts: { food: 0, entertainment: 0, travel: 0 },
    }
  );
};

export default function Home() {
  const [balance, setBalance] = useLocalStorage("balance", 5000);
  const [expenseList, setExpenseList] = useLocalStorage("expenses", []);

  // Show hide modals
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  console.time();
  const { spends: categorySpends, counts: categoryCounts } =
    calculateCategoryStats(expenseList);
  console.timeEnd();
  console.log({ categorySpends, categoryCounts });

  const expense = expenseList.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleAddIncome = () => {
    setIsOpenBalance(true);
  };
  const handleAddExpense = () => {
    setIsOpenExpense(true);
  };

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>

      {/* Cards and pie chart wrapper */}
      <div className={styles.cardsWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={handleAddIncome}
        />

        <Card
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={handleAddExpense}
        />

        <PieChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ].filter((item) => item.value)}
        />
      </div>

      {/* Transactions and bar chart wrapper */}
      <div className={styles.transactionsWrapper}>
        <TransactionList
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />

        <BarChart
          data={[
            { name: "Food", value: categoryCounts.food },
            { name: "Entertainment", value: categoryCounts.entertainment },
            { name: "Travel", value: categoryCounts.travel },
          ].filter((item) => item.value)}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </Modal>
    </div>
  );
}
