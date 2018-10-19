import java.util.Scanner;
import java.lang.Math;
import java.text.DecimalFormat;
import java.util.InputMismatchException;

public class SciCalculator
{public static void main(String[]args){

    int option = 0;
    double firstO = 0.0;
    double secondO = 0.0;
    double result = 0.0;
    double Tresult = 0.0;
    int runs = 0;
    String user;
    Scanner keyboard = new Scanner(System.in);
    DecimalFormat df2 = new DecimalFormat("#.##");

        System.out.println("Current Result: " + result);
    do{

        if(option !=7)
        {
            System.out.println("Calculator Menu");
            System.out.println("---------------");
            System.out.println("0. Exit Program");
            System.out.println("1. Addition");
            System.out.println("2. Subtraction");
            System.out.println("3. Multiplication");
            System.out.println("4. Division");
            System.out.println("5. Exponentiation");
            System.out.println("6. Logarithm");
            System.out.println("7. Display Average");

            System.out.println("");
        }

        System.out.print("Enter Menu Selection: ");
        option = keyboard.nextInt();

        System.out.println("");



        switch (option)
        {
            case 0:
                break;
            case 1:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                   {
                       firstO = result;
                   }
                   else
                    {
                    firstO = Double.valueOf(user);
                   }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = firstO + secondO;
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult + result;
                runs++;
                System.out.println("");
                break;
            case 2:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        firstO = result;
                    }
                    else
                    {
                        firstO = Double.valueOf(user);
                    }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = firstO - secondO;
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult + result;
                runs++;
                System.out.println("");
                break;
            case 3:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        firstO = result;
                    }
                     else
                    {
                        firstO = Double.valueOf(user);
                    }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = firstO * secondO;
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult + result;
                runs++;
                System.out.println("");
                break;
            case 4:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        firstO = result;
                    }
                    else
                    {
                        firstO = Double.valueOf(user);
                    }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = firstO / secondO;
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult +result;
                runs++;
                System.out.println("");
                break;
            case 5:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        firstO = result;
                    }
                    else
                    {
                        firstO = Double.valueOf(user);
                    }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = Math.pow(firstO, secondO);
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult + result;
                runs++;
                System.out.println("");
                break;
            case 6:
                System.out.print("Enter first operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        firstO = result;
                    }
                    else
                    {
                        firstO = Double.valueOf(user);
                    }
                System.out.print("\nEnter second operand: ");
                user = keyboard.next();
                    if ( user.equals("RESULT"))
                    {
                        secondO = result;
                    }
                    else
                    {
                        secondO = Double.valueOf(user);
                    }
                result = Math.log(secondO) / Math.log(firstO);
                System.out.println("\nCurrent Result: " + result);
                Tresult = Tresult + result;
                runs++;
                System.out.println("");
                break;
            case 7:
                if (runs == 0)
                {
                    System.out.println("Error: No calculations yet to average!\n");
                    System.out.print("Enter Menu Selection: ");
                    option = keyboard.nextInt();
                }
                else
                {
                    System.out.println("Sum of calculations:  " + df2.format(Tresult));
                    System.out.println("Number of calculations: " + runs);
                    double totalrun = (Tresult / runs);
                    System.out.println("Average of calculations: " + df2.format(totalrun));
                    System.out.println("");

                }
                break;
             default:
                System.out.println("Error: Invalid selection!");
                option =7;
                break;

        }

    }while(option != 0);
    System.out.println("Thanks for using this calculator. Goodbye!");





}
}
