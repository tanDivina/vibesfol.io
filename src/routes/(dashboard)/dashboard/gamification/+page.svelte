<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { Progress } from '$lib/components/ui/progress';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';

  export let data: PageData;

  let gamificationData = data.gamificationData;

  onMount(() => {
    console.log('Gamification data loaded:', gamificationData);
  });
</script>

<svelte:head>
  <title>Gamification - MyDevfol.io</title>
  <meta name="description" content="Track your portfolio progress, earn achievements, and see how you rank!" />
</svelte:head>

<div class="p-4 md:p-8 space-y-8">
  <h1 class="text-3xl font-bold">Your Gamification Stats</h1>

  <!-- Main Stats Cards -->
  <div class="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Score</CardTitle>
        <CardDescription>Your overall portfolio strength</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-4xl font-bold">{gamificationData?.portfolioScore?.total_score || 0}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard Rank</CardTitle>
        <CardDescription>Your current position</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-4xl font-bold">#{gamificationData?.rank || 'N/A'}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Achievements Unlocked</CardTitle>
        <CardDescription>{gamificationData?.userAchievements?.length || 0} / {gamificationData?.achievements?.length || 0} earned</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-4xl font-bold">
          {Math.round(((gamificationData?.userAchievements?.length || 0) / (gamificationData?.achievements?.length || 1)) * 100)}%
        </p>
      </CardContent>
    </Card>
  </div>

  <!-- Portfolio Completion -->
  <div>
    <h2 class="text-2xl font-bold mb-4">Portfolio Completion</h2>
    <Card>
      <CardContent class="pt-6">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">Your Progress</span>
          <span class="text-lg font-bold">{gamificationData?.completionPercentage || 0}%</span>
        </div>
        <Progress value={gamificationData?.completionPercentage || 0} class="w-full" />
        <p class="text-sm text-muted-foreground mt-2">Complete your profile and add projects to reach 100%!</p>
      </CardContent>
    </Card>
  </div>

  <!-- Achievements Section -->
  <div>
    <h2 class="text-2xl font-bold mb-4">Your Achievements</h2>
    <Card>
      <CardContent class="pt-6">
        {#if gamificationData?.userAchievements && gamificationData.userAchievements.length > 0}
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {#each gamificationData.userAchievements as userAchievement}
              <div class="flex flex-col items-center text-center p-4 border rounded-lg" title="{userAchievement.achievements.description}">
                <span class="text-4xl">{userAchievement.achievements.icon}</span>
                <p class="font-semibold mt-2 text-sm">{userAchievement.achievements.name}</p>
                <p class="text-xs text-muted-foreground">+{userAchievement.achievements.points} pts</p>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-center text-muted-foreground py-8">You haven't unlocked any achievements yet. Keep building your portfolio!</p>
        {/if}
      </CardContent>
    </Card>
  </div>

  <!-- Leaderboard Section -->
  <div>
    <h2 class="text-2xl font-bold mb-4">Top 10 Leaderboard</h2>
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50px]">Rank</TableHead>
            <TableHead>Developer</TableHead>
            <TableHead class="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each data.leaderboard as entry, i}
            <TableRow>
              <TableCell class="font-medium">{i + 1}</TableCell>
              <TableCell>
                <div class="flex items-center gap-3">
                  <img src={entry.profiles?.avatar_url || '/default-avatar.png'} alt={entry.profiles?.full_name} class="w-8 h-8 rounded-full" />
                  <div>
                    <p class="font-bold">{entry.profiles?.full_name}</p>
                    <p class="text-sm text-muted-foreground">@{entry.profiles?.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell class="text-right font-bold">{entry.total_score}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </Card>
  </div>

</div>
