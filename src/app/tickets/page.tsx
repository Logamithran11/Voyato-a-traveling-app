
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {ArrowLeft, ArrowRight, Clock, Luggage, Plane, Ticket as TicketIcon} from 'lucide-react';
import Link from 'next/link';

export default function TicketsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TicketIcon /> My Tickets
          </CardTitle>
          <CardDescription>
            Here are your upcoming flight details.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="shadow-lg">
        <CardHeader className="bg-muted/50 flex-row items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Tokyo (NRT) to Kyoto (UKY)</p>
              <p className="text-sm text-muted-foreground">
                Monday, October 28, 2024
              </p>
            </div>
          </div>
          <Button variant="outline">Download Ticket</Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">Depart</p>
              <p className="text-2xl font-bold">10:30 AM</p>
              <p className="font-medium">NRT</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <Separator className="hidden md:block flex-1" />
              <div className="flex flex-col items-center">
                <Clock className="h-4 w-4" />
                <span className="text-xs mt-1">2h 30m</span>
              </div>
              <ArrowRight className="h-6 w-6" />
              <Separator className="hidden md:block flex-1" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Arrive</p>
              <p className="text-2xl font-bold">1:00 PM</p>
              <p className="font-medium">UKY</p>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Passenger</p>
            <p className="font-medium">Alex Doe</p>
          </div>
          <div>
            <p className="text-muted-foreground">Seat</p>
            <p className="font-medium">24A</p>
          </div>
          <div>
            <p className="text-muted-foreground">Gate</p>
            <p className="font-medium">D12</p>
          </div>
          <div className="flex items-center gap-2">
            <Luggage className="h-5 w-5 text-primary" />
            <p className="font-medium">2 Checked Bags</p>
          </div>
        </CardFooter>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <CardTitle>No more tickets</CardTitle>
          <CardDescription>
            You have no other upcoming flights.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
