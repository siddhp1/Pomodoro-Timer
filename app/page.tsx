import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center p-8">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Pomodoro Timer
        </h1>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <p className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-9xl">
                00:00
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-200">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-9xl">
                  25:00
                </h1>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-9xl">
                25:00
              </h1>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* add a timer component here */}
      {/* <ThemeToggle /> */}
    </>
  );
}
