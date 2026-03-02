# Architecture: Filter Presets (Ashley)

Here I'll describes the filter preset repository, service, and hook used on the Expense Filter page.

---

## Filter Preset Repository (apis/filterPresetRepo.ts)

What it does: 
filterPresetRepo.ts holds the list of saved filter presets and exposes getAll(), add(preset), and deletePreset(id) so other parts of the app can read and change the list. 

Why is the logic here:
The filter preset repo is the only place that talks to the preset data (which is test data for now). We keep all read/write in one module which makes it easier to add in the real API later without having to change things again. 

Where is it used:
The filter preset service imports and calls it and no component or hook imports the filter preset repo directly.

---

## Filter Preset Service (services/filterPresetService.ts)

What it does: 
filterPresetService.ts exposes getAllPresets(), addPreset(preset), and deletePreset(id) that call the filter preset repo.

Why is the logic here:
works between the UI (hook) and the filter preset repo so we keep the hook-service-repository pattern. Now any future validation or rules would go here. 

Where is it used:  
The useFilterPresets hook uses it and no component calls the service directly.

---

## useFilterPresets Hook (hooks/useFilterPresets.ts)

What does it do:
the useFilterPresets hook keeps the presets list instate, loading it from the service on initial use and returns `presets`, `addPreset`, and `removePreset`, the result is the Expense Filter page can show the saved presets and add new ones.

Why is the logic here:
This hook handles the logic while instate. This helps keep the page and component simple 

Where is it used:  
ExpenseFilterPage  calls useFilterPresets() and uses the returned presets for the UI
